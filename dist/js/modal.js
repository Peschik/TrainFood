    const sendForm = () => {
        const btns = document.querySelectorAll('.btn'),
            modal = document.querySelector('.modal'),
            modal__close = document.querySelector('.modal__close');

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
            if (event.target === modal) {
                modalClose();
            }
        })
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display === 'flex') {
                modalClose();
            }
        })
        modal__close.addEventListener('click', modalClose);
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
            loading: 'Thx! We are loading your data right now!',
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

                const statusMessage = document.createElement('div');
                statusMessage.classList.add('divider');
                statusMessage.textContent = message.loading;
                statusMessage.innerHTML = '<img src = "img/messages/Loading.jpeg">'
                form.append(statusMessage);

                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type','multipart/form-data');

                //in input must be set atribute 'name' not important what 
                //is in it, else we can't get the form's content

                const formData = new FormData(form);
                request.send(formData);

                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        console.log(request.response);
                        statusMessage.textContent = message.success;
                    } else {
                        statusMessage.textContent = message.failure;
                    }
                })
            })
        }
        
    }
    sendForm();