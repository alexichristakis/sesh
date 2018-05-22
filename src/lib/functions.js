export const TimeAgo = (timestamp: number) => {
	if (!timestamp) {
		return "";
	}
	var seconds = Math.floor((new Date().getTime() - timestamp) / 1000);

	if (seconds < 0) {
		return timein(-1 * seconds);
	}

	var interval = Math.floor(seconds / 31536000);

	if (interval > 1) {
		return interval + "y ago";
	}
	interval = Math.floor(seconds / 2592000);
	if (interval >= 1) {
		if (interval == 1) {
			return interval + " month ago";
		}
		return interval + " months ago";
	}

	interval = Math.floor(seconds / 604800);
	if (interval >= 1) {
		if (interval == 1) {
			return interval + " week ago";
		}
		return interval + " weeks ago";
	}

	interval = Math.floor(seconds / 86400);
	if (interval >= 1) {
		if (interval == 1) {
			return interval + " day ago";
		}
		return interval + " days ago";
	}

	interval = Math.floor(seconds / 3600);
	if (interval >= 1) {
		if (interval == 1) {
			return interval + " hour ago";
		}
		return interval + " hours ago";
	}

	interval = Math.floor(seconds / 60);
	if (interval >= 1) {
		if (interval == 1) {
			return interval + " min ago";
		}
		return interval + " mins ago";
	}
	if (interval == 0) {
		return "just now";
	}

	return Math.floor(seconds) + "s";
};
