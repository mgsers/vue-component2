<template>
    <div class="date-picker-container"
         tabindex="-1"
         @focus=""
         @blur=""
         :class="{range, week: type === 'week',active: showPicker, disabled}">
         <div class="selectedDate" v-if="type === 'date' && !range">{{ value | dateFormat }}</div>
         <div class="selectedDate"></div>
         <div class="selectedDate"></div>
         <div class="selectedDate"></div>
            <div class="picker">
                <picker>
                </picker>
            </div>
    </div>
</template>
<script>

const gen = (year, month, date) => ({
    value: date,
    title: `${year}${month}${day}`,
    timeStamp: new Date(year, month-1, date).getTime()
})

lastMonthDates() {
    const year = this.year;
    const month = this.month;
    const dayOfFirstDay = new Date(year, month -1, 1).getDay();
    const daysOfLastMonth = new Date(year, month -1, 0).getDate();

    return range(daysOfLastMonth, daysOfLastMonth-(dayOfFirstDay?dayOfFirstDay-1:6)+1)
            .map(gen.bind(null, year,month-1))
}

dates() {
    const year = this.year;
    const month = this.month;

    return range(new Date(year, month, 0).getDate())
        .map(gen.bind(null,year,month))
}

nextMonthDates() {
    const year = this.year;
    const month = this.month;

    return range(42-this.lastMonthDates.length-this.dates.length)
        .map(gen.bind(null,year,month+1))
}
    
</script>
<style lang="">
    .date-picker-container {
        border: 1px solid #ccc;
        box-sizing: content-box;
        position: relative;
        width: 148px;
        background-color: #fff;
        border-radius: 5px;
        height: 30px;
    }
    .date-picker-container .selectedDate {
        font-size: 14px;
        padding: 4px 12px;
        cursor: pointer;
    }
</style>