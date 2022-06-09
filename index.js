const $template = document.querySelector('template').content,
$fragment = document.createDocumentFragment()
const getDataViewing = async()=>{
    const response = await fetch('./data.json')
    const jsonViewing = await response.json()
    const viewingActive = document.querySelector('.list-viewing .active').textContent.toLocaleLowerCase()
    jsonViewing.forEach(el=>{
        $template.querySelector('.title-viewing').textContent=el.title
        $template.querySelector('.current span').textContent=el.timeframes[viewingActive].current
        $template.querySelector('.previous span').textContent=el.timeframes[viewingActive].previous
        $template.querySelector('.viewing-card').classList.add(`${el.title.toLocaleLowerCase().replace(' ','-')}-card`)
        const clone = $template.cloneNode(true)
        $fragment.appendChild(clone)
        $template.querySelector('.viewing-card').classList.remove(`${el.title.toLocaleLowerCase().replace(' ','-')}-card`)

    })
    document.querySelector('main').appendChild($fragment)
    
}
getDataViewing()

const actionsViewing = document.querySelectorAll('.viewing-track li')
actionsViewing.forEach(action=>{
    action.addEventListener('click',e=>{
        actionsViewing.forEach(el=>el.classList.remove('active'))
        e.target.classList.add('active')
        const editViewing = async()=>{
            const response = await fetch('./data.json')
            const jsonViewing = await response.json()
            const viewingActive = document.querySelector('.list-viewing .active').textContent.toLocaleLowerCase()
        
            jsonViewing.forEach(el=>{
                document.querySelector(`.${el.title.toLocaleLowerCase().replace(' ','-')}-card .current span`).textContent=el.timeframes[viewingActive].current
                document.querySelector(`.${el.title.toLocaleLowerCase().replace(' ','-')}-card .previous span`).textContent=el.timeframes[viewingActive].previous
            })
        }
        editViewing()
    })
})