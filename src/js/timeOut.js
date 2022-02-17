const timeOut = () => {
    const timer = setInterval(function () {
        const days = document.getElementById('days'),
            hours = document.getElementById('hours'),
            minutes = document.getElementById('minutes'),
            seconds = document.getElementById('seconds'),
            timeBlocks = document.querySelectorAll('.timer__block'),
    
            endData = new Date(2022, 4, 20),
            now = new Date(),
            difference = endData - now;
    
        days.textContent = Math.floor(difference / (1000 * 60 * 60 * 24));
        if (days.textContent > 100){
            timeBlocks[0].style.width = `140px`;
        }
    
        hours.textContent = Math.floor((difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    
        if (hours.textContent < 10){
            hours.textContent = '0' + hours.textContent;
        }
    
        minutes.textContent = Math.floor((difference % (1000 * 60 * 60) / (1000 * 60)));
        if (minutes.textContent < 10){
            minutes.textContent = '0' + minutes.textContent;
        }
    
        seconds.textContent = Math.floor((difference % (1000 * 60) / 1000));
        if (seconds.textContent < 10){
            seconds.textContent = '0' + seconds.textContent;
        }
    }, 1000);
}
export default timeOut;