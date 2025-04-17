const formatNumber = (num: number): string => {
    num = Math.floor(num);

    if (num >= 1_000_000_000_000) {
        return (num / 1_000_000_000_000).toFixed(1) + 'T';
    } else if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1) + 'B';
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
        return num.toLocaleString();
    } else {
        return num.toString();
    }
};


export default formatNumber;