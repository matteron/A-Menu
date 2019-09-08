module.exports = class WeekCard {

	constructor(weekday, lang) {
		this.weekday = weekday;
		this.lunch = 'No Lunch Selected';
		this.dinner = 'No Dinner Selected';
	}

	html() {
		return `
			<div class="card weekcard cardShadow">
				<h5 class="card-header header-${this.weekday} d-flex justify-content-between">
					${lang[this.weekday]}
					<span class="editIcon" onclick="editDay('${this.weekday}')">⚙️</span>
				</h5>
				<div class="card-body">
					<h5 class="card-title">${lang.labels.lunch}</h5>
					<p class="card-text">
						${this.lunch}
					</p>
				</div>
				<div class="card-body">
					<h5 class="card-title">${lang.labels.dinner}</h5>
					<p class="card-text">
						${this.dinner}
					</p>

				</div>
			</div>
		`;
	}

	render() {
		return this.html();
	}
}