export const convertDate = {
  methods: {
    convertTimeToDate(t, format) {

        var date = new Date(t);

        var hours_ = date.getHours();
        var minutes_ = "0" + date.getMinutes();
        var seconds_ = "0" + date.getSeconds();

        var date_ = '0' + date.getDate();
        var month_ = '0' + ( date.getMonth() + 1 );
        var year_ = date.getFullYear();

        format = format.replace('YYYY', year_)
        format = format.replace('MM', month_.slice(-2))
        format = format.replace('DD', date_.slice(-2))
        format = format.replace('S', seconds_.substr(-2))
        format = format.replace('M', minutes_.substr(-2))
        format = format.replace('H', hours_)

        return format

    }
  }
}
