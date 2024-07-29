type Props =
    {
        [key: string]: any,
    }


export default function WithDollarPrefix(props: Props): Props {
    return Object.keys(props).reduce((acc, key: string) => {
        acc[`$${key}`] = props[key];
        return acc;
    }, {} as Props);
};
