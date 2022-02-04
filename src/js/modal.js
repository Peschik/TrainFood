    const sendForm = () => {
        const btns = document.querySelectorAll('.btn'),
            modal = document.querySelector('.modal');

        btns.forEach(item => {
            if (item.textContent.includes('Связаться с нами')) {
                item.setAttribute('data-modal', '')
            }
        })
        const modalClose = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        const modalOpen = () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        const btnsOpenModal = document.querySelectorAll("[data-modal]")
        btnsOpenModal.forEach(item => {
            item.addEventListener('click', () => {
                modalOpen();
            })
        })
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.classList.contains("modal__close")) {
                modalClose();
            }
        })
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display === 'flex') {
                modalClose();
            }
        })
        // const modalTimerId = setTimeout(modalOpen, 3000);

        function showModalByScroll (){
            
                if(window.pageYOffset + document.documentElement.clientHeight >= 
                    document.documentElement.scrollHeight){
                    modalOpen();
                    window.removeEventListener('scroll', showModalByScroll);
                }
        }
        window.addEventListener('scroll', showModalByScroll)

        //Forms

        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/spinner/spinner.svg',
            success: "Wow! We did it! Without u it wouldn't work!",
            failure: "Oh no, we've got some problems there, let's solve 'em,\
             eeh, u can get a cup of tea and.. wait a bit, please"
        }
        forms.forEach(item => {
            postData(item);
        })
        function postData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                
                const statusMessage = document.createElement('img');
                statusMessage.setAttribute('src', message.loading);
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);

                //in input must be set atribute 'name' not important what 
                //is in it, else we can't get the form's content

                const formData = new FormData(form);

                const object = {};
                formData.forEach((value, key) => {
                    object[key] = value;
                });


                //If we use the combination of XMLHttpRequest and FormData
                //we don't need to setRequestHeader, it creates by auto


                fetch('server.php', {
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(object)
                })
                .then(data => data.text())
                .then(data => {
                        console.log(data);
                        showThanksModal(message.success);
                        statusMessage.remove();
                        form.reset();
                })
                .catch(() => {
                        showThanksModal(message.failure)

                })
                .finally(() => {
                    form.reset()
                })
            
            })
        }
        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.style.display = 'none';
            modalOpen();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class= "modal__content">
                    <div class="modal__close">✖︎</div>
                    <div class="modal__title">${message}</div>
                    
                </div>
            `;
            
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.style.display = 'block';
                modalClose();
            }, 4000)
            
        }
       
    }
    
    sendForm();
    
