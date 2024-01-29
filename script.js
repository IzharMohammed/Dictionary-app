//fetching of 
async function fetchData(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
//Creation of elements
const container = document.createElement('div')
const partsOfSpeech = document.createElement('div');
const definition = document.createElement('div');
const synonym = document.createElement('div');
const phonetic = document.createElement('div');
const heading1 = document.createElement('div')
const heading2 = document.createElement('div')
const heading3 = document.createElement('div')
//Adding class Names
container.classList.add('container')
partsOfSpeech.classList.add('partsOfSpeech')
definition.classList.add('definition')
synonym.classList.add('synonym')
phonetic.classList.add('phonetic')
const emptyDiv = document.getElementById('emptyDiv')

//Deleting previous search elements if we search new element
let renderDom = () => {
    phonetic.innerHTML = ''
    synonym.innerHTML = ''
    definition.innerHTML = ''
    heading1.innerHTML = ''
    heading2.innerHTML = ''
    heading3.innerHTML = ''
}

async function main(data) {

    renderDom();
    //Storing all definitions, synonyms , phonetics in an array so that we can attach all of them to single div 
    const dynamicArrayDef = [];
    const dynamicArraySyn = []
    const dynamicArrayPhonetic = []
    // console.log(dynamicArrayPhonetic);
    // console.log(data[0].meanings.length);
    // console.log(data[0].phonetics[0].text);

    //Storing phonetics in an array
    for (let i = 0; i < data[0].phonetics.length; i++) {
        // console.log(`phonetics ${i}: ${data[0].phonetics[i].text}`);
        dynamicArrayPhonetic.push(data[0].phonetics[i].text)
    }

    //traversing all elements and pushing it in corresponding arrays
    for (let i = 0; i < data[0].meanings.length; i++) {
        // console.log('parts of speech ', data[0].meanings[i].partOfSpeech);
        for (let j = 0; j < data[0].meanings[i].definitions.length; j++) {
            // console.log(`definition  ${j}`, data[0].meanings[i].definitions[j].definition);
            //Storing definitions in an array
            dynamicArrayDef.push(data[0].meanings[i].definitions[j].definition)
        }
        for (let k = 0; k < data[0].meanings[i].synonyms.length; k++) {
            // console.log(`synonym ${k}`, data[0].meanings[i].synonyms[k]);
            //Storing synonyms in an array
            dynamicArraySyn.push(data[0].meanings[i].synonyms[k])
        }

    }

    //traversing from corresponding elements and attaching each element of an array to div (Definition)
    dynamicArrayDef.forEach((def, index) => {
        const definitionDiv = document.createElement('div');
        definitionDiv.innerHTML = `${index + 1} : ${def}`
        definition.append(definitionDiv)
        if (index < dynamicArrayDef.length - 1) {
            definition.append(document.createElement('hr'))
        }
    })
    //traversing from corresponding elements and attaching each element of an array to div (Synonym)
    dynamicArraySyn.forEach((syn, index) => {
        const synDiv = document.createElement('div');
        synDiv.innerHTML = `${index + 1} : ${syn}`
        synonym.append(synDiv)
        if (index < dynamicArraySyn.length - 1) {
            synonym.append(document.createElement('hr'))
        }
    })
    //traversing from corresponding elements and attaching each element of an array to div (phonetics)
    dynamicArrayPhonetic.forEach((pho, index) => {
        const phoDiv = document.createElement('div');
        phoDiv.innerHTML = `${index + 1} : ${pho}`
        phonetic.append(phoDiv)
        if (index < dynamicArrayPhonetic.length - 1) {
            phonetic.append(document.createElement('hr'))
        }
    })

    heading1.innerText = 'Definitions :'
    heading2.innerText = 'Synonyms : '
    heading3.innerText = 'Phonetics :'

    container.append(heading1)
    container.append(definition)
    container.append(heading2)
    container.append(synonym)
    container.append(heading3)
    container.append(phonetic)
    emptyDiv.append(container)
    document.body.appendChild(emptyDiv)
}
//Adding event listeners
const form = document.querySelector('form')
const input = document.querySelector('.input')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = await fetchData(input.value)
    input.value = ''
    main(data)
})