export const TimeStampToStr = (timestamp) =>{
    const currentDate = new Date();
    const objectDate = timestamp.toDate() ;

    const years = objectDate.getFullYear();
    const hours = objectDate.getHours()
    const minutes = objectDate.getMinutes();

    const yearFormat = years !== currentDate.getFullYear() ? `${years}. ` : "";
    const monthFormat = `${objectDate.getMonth()+1}. `;
    const dateFormat = `${objectDate.getDate()}. `;
    const hoursFormat = hours >= 12 && hours < 24 ? `오후 ${hours%12}:`:`오전 ${hours ===24 ? 0: hours}:` ;
    const minutesFormat = minutes >= 10 ? minutes : `0${minutes}`; 

    return yearFormat+monthFormat+dateFormat+hoursFormat+minutesFormat;
}