export default function dateCalculate(day: string): number {
	const today: Date = new Date();

    const splitDate = new Date(day).setUTCHours(0, 0, 0, 0); 

    const timeDifference = today.getTime() - splitDate;

    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    return daysDifference;
}
