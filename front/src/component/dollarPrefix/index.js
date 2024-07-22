
export default function WithDollarPrefix(props) {
    return Object.keys(props).reduce((acc, key) => {
        acc[`$${key}`] = props[key];
        return acc;
    }, {});
};
