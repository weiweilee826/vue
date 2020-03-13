export default
    function toThousands(num) {
    return "$ " + num.toString().replace(/(?=(\B\d{3})+\b)/g, ",");
}
