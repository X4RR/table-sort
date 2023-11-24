import { defineStore } from 'pinia';
import info from './data.json';
import { formatDate } from './dates';

export const useItemsStore = defineStore('items', {
  state: () => ({
    info,
    sortedBy: null,
    termsDesc: [],
    fullArray: [],
    startDates: [],
    endSoonDates: [],
    endDates: [],
    endAlreadyDates: [],
    isReversed: false,
    isFiltered: false,
    filtered: [],
    // связь заголовка таблицы с названием свойства json'a
    titles: [
      { head: 'ID', column: 'o_id' },
      { head: 'Имя клиента', column: 'client_name' },
      { head: 'Диеты', column: 'diets' },
      { head: 'Тарифы', column: 'tariff' },
      { head: 'Адрес', column: 'address' },
      { head: 'Номер телефона', column: 'phone' },
      { head: 'Даты', column: 'dates' },
      { head: 'Размер скидки', column: 'discount' },
      { head: 'Оплата', column: 'order_sum' },
      { head: 'Комментарий курьеру', column: 'courier_comment' },
      { head: 'Доп. информация', column: 'inner_comment' },
      { head: 'Срок', column: 'term' },
    ],
    numArr: ['discount', 'o_id', 'order_sum'],
    numStr: ['client_name', 'tariff', 'courier_comment', 'inner_comment'],
  }),
  actions: {
    sortTerm() {
      this.info.forEach((el) => {
        let date = el.parsedDate;
        if (date.includes('Начнётся')) {
          this.startDates.push(el);
        }
        if (
          date.startsWith('Заканчивается сегодня') ||
          date.startsWith('Закончится завтра')
        ) {
          this.endSoonDates.push(el);
        }
        if (date.includes('Заканчивается через')) {
          this.endDates.push(el);
        }
        if (date.includes('Закончилось')) {
          this.endAlreadyDates.push(el);
        }
      });
      this.sortArrays();
      let sortArray = this.joinArrays();
      if (this.isReversed) {
        sortArray.reverse();
      }
      this.info.sort(function (a, b) {
        return sortArray.indexOf(a) - sortArray.indexOf(b);
      });
    },
    sortArrays() {
      this.sortStartDates(this.startDates);
      this.sortendSoonDates(this.endSoonDates);
      this.sortEndDates(this.endDates);
      this.sortEndDates(this.endAlreadyDates);
    },
    joinArrays() {
      return this.startDates.concat(
        this.endSoonDates,
        this.endDates,
        this.endAlreadyDates
      );
    },
    sortStartDates(arr) {
      arr.sort((a, b) => {
        let d = parseInt(a.parsedDate.replace(/[^\d]/g, ''));
        let c = parseInt(b.parsedDate.replace(/[^\d]/g, ''));
        return this.compare(c, d);
      });
    },
    sortendSoonDates(arr) {
      arr.sort((a, b) => {
        if (a == 'Заканчивается сегодня' && b == 'Закончится завтра') {
          return 1;
        }
        if (b == 'Заканчивается сегодня' && a == 'Закончится завтра') {
          return -1;
        }
        return 0;
      });
    },
    sortEndDates(arr) {
      arr.sort((a, b) => {
        let c = parseInt(a.parsedDate.replace(/[^\d]/g, ''));
        let d = parseInt(b.parsedDate.replace(/[^\d]/g, ''));
        return this.compare(c, d);
      });
    },
    // Проверка флага сортировки и установка ревёрса
    sortCheck(title) {
      console.log(title);
      if (this.sortedBy == title.column) {
        this.isReversed = !this.isReversed;
      } else {
        this.isReversed = false;
      }
      this.switchCheck(title.column);
      this.setSort(title);
    },
    switchCheck(column) {
      switch (true) {
        case this.numArr.includes(column):
          this.sortNum(column);
          break;
        case column == 'dates':
          this.sortDate(column);
          break;
        case column == 'phone':
          this.sortPhone(column);
          break;
        case this.numStr.includes(column):
          this.sortString(column);
          break;
        case column == 'diets':
          this.sortDiet(column);
          break;
        case column == 'term':
          this.sortTerm();
          break;
      }
    },

    // установка флага сортировки
    setSort(title) {
      this.sortedBy = title.column;
    },
    // поиск максимальных значений во вложенных массивах
    findMax(a, column) {
      let first = a[column];
      let maxFirst = 0;
      first.forEach((el) => {
        let firstNum = parseInt(el.match(/\d{3,}/g, ''));
        if (firstNum > maxFirst) {
          maxFirst = firstNum;
        }
      });
      return maxFirst;
    },
    // Отвечает за процесс сортировки
    compare(a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    },
    compareRev(a, b) {
      if (b > a) {
        return 1;
      }
      if (b < a) {
        return -1;
      }
      return 0;
    },
    reverseStr(a, b) {
      if (!this.isReversed) {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      } else if (this.isReversed) {
        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }
        return 0;
      }
    },
    // сортировка числовых значений по переданному названию столбца
    // столбец "оплата" сортируется по order_sum
    sortNum(title) {
      this.info.sort((a, b) => {
        return this.reverseStr(a[title], b[title]);
      });
    },
    sortDate(title) {
      this.info.sort((a, b) => {
        let c = a[title][0].start_date;
        let d = b[title][0].start_date;
        c = Date.parse(c);
        d = Date.parse(d);
        return this.reverseStr(c, d);
      });
    },
    sortPhone(title) {
      this.info.sort((a, b) => {
        let phoneA = parseInt(a[title].replace(/[^\d]/g, ''));
        let phoneB = parseInt(b[title].replace(/[^\d]/g, ''));
        return this.reverseStr(phoneA, phoneB);
      });
    },
    // сортировка строковых значений, в том числе тарифов
    // по первому тарифу
    sortString(title) {
      this.info.sort((a, b) => {
        let c = a[title] != null ? a[title] : '';
        let d = b[title] != null ? b[title] : '';
        console.log(c, d);
        return this.reverseStr(c, d);
      });
    },

    // сортировка по диетам,
    // сначала findMax находит наибольшее число
    // в массиве diets, после чего применяется сортировка reverse
    sortDiet(title) {
      this.info.sort((a, b) => {
        let maxFirst = this.findMax(a, title);
        let maxSecond = this.findMax(b, title);
        return this.reverseStr(maxFirst, maxSecond);
      });
    },
    parseDates() {
      this.info.forEach((e) => {
        let [date, timestamp] = formatDate(e.dates);
        console.log(date, timestamp);
        e.parsedDate = date;
        e.timestamp = timestamp;
      });
    },
  },
});
