console.log('Breaking Bad Random Character Card from https://breakingbadapi.com/ made with AXIOS')

// Boton 
document.addEventListener('click', e => {
    //console.log(e.target)
    if (e.target.classList.contains('btn')) {
        const random = getRandomInt(1,50)
        fetchData(random)
    }
})

// Evento que carga primero el HTML

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1,50)
    fetchData(random)
})

// Numero Random
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }


// Consumir de la API -
const fetchData = async (id) => {
    try {
        const res = await axios (`https://breakingbadapi.com/api/characters/${id}`)
        console.log(id)
        console.log(res.data[0])

        const personaje = {
            name: res.data[0].name,
            img: res.data[0].img,
            nickname: res.data[0].nickname,
            occupation: res.data[0].occupation[0],
            cumple: res.data[0].birthday,
            status: res.data[0].status
        }

        pintarCard(personaje)
    } catch (error) {
        console.log(error)
    }
}

// Pintar Card en HTML

 const pintarCard = (personaje) => {
    console.log(personaje)

    const flex = document.querySelector('.flex')
    flex.innerHTML = ''
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', personaje.img)
    clone.querySelector('.card-body-title').innerHTML = `${personaje.name}`
    clone.querySelector('.card-body-text').textContent = personaje.nickname
    clone.querySelectorAll('.card-footer-social p')[0].textContent = personaje.occupation
    clone.querySelectorAll('.card-footer-social p')[1].textContent = personaje.cumple
    clone.querySelectorAll('.card-footer-social p')[2].textContent = personaje.status
    fragment.appendChild(clone)
    flex.appendChild(fragment)
} 