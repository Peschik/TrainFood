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
        const modalTimerId = setTimeout(modalOpen, 3000);

        function showModalByScroll (){
            
                if(window.pageYOffset + document.documentElement.clientHeight >= 
                    document.documentElement.scrollHeight){
                    modalOpen();
                    window.removeEventListener('scroll', showModalByScroll);
                }
        }
        window.addEventListener('scroll', showModalByScroll)

        
    }
    sendForm();