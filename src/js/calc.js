const calc = () => {
    // Формула расчета базовой нормы калорий:
    //для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
    //для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
    const gender = document.querySelector('#gender'),
        female = gender.children[0],
        genderChoose = gender.querySelectorAll('.calculating__choose-item')
        physique = document.querySelector('.calculating__choose_medium'),
        physiques = physique.querySelectorAll('input')
        height = physique.children[0],
        weight = physique.children[1],
        age = physique.children[2],
        numberCheck = /\D/g,
        activity = document.querySelector('.calculating__choose_big'),
        activeChoose = activity.querySelectorAll('.calculating__choose-item'),
        calcResults = document.querySelector('.calculating__result'),
        activeClass = 'calculating__choose-item_active',
        activities = [1.2, 1.375, 1.55, 1.725];

    class CalculatorEnergy {
        constructor() {
            this.genderBase;
            this.groth;
            this.weight;
            this.age;
            this.activity;
            this.calcBase();
            this.calcActive();
            this.calcGroth();
            this.calcWeight();
            this.calcAge();
        }
        calcBase() {
            if (female.classList.contains(activeClass)) {
                this.genderBase = 447.6
            } else {
                this.genderBase = 88.36
            }
        }
        calcActive() {
            activeChoose.forEach((item, index) => {
                if (item.classList.contains(activeClass)) {
                    this.activity = activities[index];
                }
            })
        }
        calcGroth() {
            if (female.classList.contains(activeClass)) {
                this.groth = 3.1 * height.value.replace(numberCheck, "");
            } else {
                this.groth = 4.8 * height.value.replace(numberCheck, "");
            }
        }
        calcWeight() {
            if (female.classList.contains(activeClass)) {
                this.weight = 9.2 * weight.value.replace(numberCheck, "");
            } else {
                this.weight = 13.4 * weight.value.replace(numberCheck, "");
            }
        }
        calcAge() {
            if (female.classList.contains(activeClass)) {
                this.age = 4.3 * age.value.replace(numberCheck, "")
            } else {
                this.age = 5.7 * age.value.replace(numberCheck, "")
            }
        }
        calcResult() {
            calcResults.textContent = Math.floor(((this.genderBase + this.groth + this.weight - this.age) * this.activity))
        }
    }
    const changeActive = (indexClicked, collection) => {
        collection.forEach((item, index) => {
            item.classList.remove(activeClass)
            if (index === indexClicked) {
                item.classList.add(activeClass)  
            }
            if (height.value && weight.value && age.value) {
                new CalculatorEnergy().calcResult();
            }
        });
    };
    const activateButton = (parent) => {
        parent.forEach((choise, index) => {
            choise.addEventListener('click', () => changeActive(index, parent))
        })
    }
    const physiqueReady = () => {
        physiques.forEach(item => {
            item.addEventListener('input', (event) => {
                event.preventDefault();
                if (height.value && weight.value && age.value) {
                    new CalculatorEnergy().calcResult();
                    valueTest();
                    setCacheResults();
                }
            })
        })

    }
    const valueTest = () => {
        physiques.forEach(item => {
            if (item.value <= 0 || item.value.replace(numberCheck, "") === "") {
                calcResults.textContent = 'Please, enter the numbers'
            }
            if (height.value.replace(numberCheck, "") > 220) {
                calcResults.textContent = "You're a very tall persone!:O"
            }
            if (weight.value.replace(numberCheck, "") > 220) {
                calcResults.textContent = "Food is ur best friend!"
            }
            if (age.value.replace(numberCheck, "") > 100) {
                calcResults.textContent = "We doubt u've entered ur age correct :| "
            }
        })
    }
    const cacheResults = () => {
        if (localStorage.getItem('male')) {
            genderChoose[0].classList.remove(activeClass)
            genderChoose[1].classList.add(activeClass)
        }
        if(localStorage.getItem('active')){
            let indexActive = localStorage.getItem('active')
            activeChoose.forEach((item, index) => {
                item.classList.remove(activeClass)
               if(index === +indexActive){ 
                   item.classList.add(activeClass)
               }
            })
        }
        physiques.forEach((item, index) => {
            item.value = localStorage.getItem(`phys${index}`)
            })   
    }
    const setCacheResults = () => {
        if (genderChoose[1].classList.contains(activeClass)) {
            localStorage.setItem('male', true)
        } else {
            localStorage.removeItem('male')
        }
        activeChoose.forEach((item, index) => {
            if(item.classList.contains(activeClass)){
            localStorage.setItem('active', index)
            }    
        })
        physiques.forEach((item, index) => {
            localStorage.setItem(`phys${index}`, item.value)
        })
    }
    activateButton(genderChoose);
    activateButton(activeChoose);
    physiqueReady();
    cacheResults()
}
export default calc;