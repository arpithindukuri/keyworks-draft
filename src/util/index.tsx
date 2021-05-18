export function getColor(percent: number, inverse?: boolean) {
	if (!inverse) {
		if (percent <= 0.33) return "#3adf5d";
		else if (percent <= 0.66) return "#ffa339";
		else return "#f1462f";
	} else {
		if (percent <= 0.33) return "#f1462f";
		else if (percent <= 0.66) return "#ffa339";
		else return "#3adf5d";
	}
}
