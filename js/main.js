



class Hero{ 
    constructor(name,initiative,isHero){ 
        this.name = name ; 
        this.initiative = initiative;
        this.isHero = isHero;
    }

   

}

let max_initiative = 0 ; 
const heroList = []; 


function getRandomInRange(min,max) { 
    return Math.floor(Math.random() * (max-min+1)) + min ; 
}



function figth(){ 
    
    const figth_btn_add_member = document.querySelector(".fight__btn--add-member")
    const figth_btn_start_fight = document.querySelector(".fight__btn--start-fight")

    
    figth_btn_add_member.addEventListener('click' , () => { 
        const isHero = confirm("Это NPC?")
        let member_name = null 
        let member_initiative = null 
        if (!isHero){ 
            while (member_name == null){ 
                member_name = prompt("Имя")
            }
            while (member_initiative == null || isNaN(member_initiative)){ 
                member_initiative= +prompt("Значение инициативы")
            }
           
            
            
        }
        else {
            while (member_name == null){ 
                member_name = prompt("Имя")
            }
            member_initiative= prompt("Значение инициативы")
            if(member_initiative == null) { 
                member_initiative = getRandomInRange(0,20);
            }
            else { 
                member_initiative = parseInt(member_initiative)
            }
            

            
        }

        max_initiative = Math.max(max_initiative , member_initiative);
        heroList.push(new Hero(member_name ,member_initiative,!isHero))
        
        fight_construction();
        
    })

    figth_btn_start_fight.addEventListener('click' , () =>{ 
        fight_construction();
    })
}


function fight_construction(){ 
    const turn_box = document.querySelector(".fight__list");
    while(turn_box.firstChild) {
        turn_box.removeChild(turn_box.lastChild);
    }
    // Добавим индексы для сохранения порядка создания
    const indexedHeroList = heroList.map((hero, index) => ({ index, hero }));

    indexedHeroList.sort((a, b) => {
        // Сравнение инициативы (по убыванию)
        if (b.hero.initiative !== a.hero.initiative) {
            return b.hero.initiative - a.hero.initiative;
        }
        // Приоритет героям (isHero === true)
        if (b.hero.isHero !== a.hero.isHero) {
            return b.hero.isHero - a.hero.isHero;
        }
        // Сохранение порядка создания
        return a.index - b.index;
    });

    const sortedHeroList = indexedHeroList.map(item => item.hero);

    sortedHeroList.map(hero => { 
        const item = document.createElement('li'); 
        item.textContent = `${hero.name} ${hero.initiative}` ;
        item.classList.add("fight__member")
        turn_box.appendChild(item); 
    })
    
}

figth();