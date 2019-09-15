module.exports = class WeekCard {

	constructor(weekday, lang, meals) {
		this.weekday = weekday;
		this.meals = meals ? meals : {
			lunch: {
				first: '',
				second: '',
				sides: ''
			},
			dinner: {
				first: '',
				second: '',
				sides: ''
			}
		};
		this.lunchHTML = '';
		this.dinnerHTML = '';
	}

	html() {
		return `
			<div class="card weekcard cardShadow">
				<div
					class="d-flex justify-content-between align-items-center card-header header-${this.weekday}"
					onclick="editDay('${this.weekday}')"
					style="cursor: pointer;"
				>
					<h5 class="mb-0">
						${lang[this.weekday]}
					</h5>
					<small class="editIcon">${lang.labels.edit}</small>
				</div>
				<div class="card-body">
					<h5 class="card-title">${lang.labels.lunch}</h5>
					<p class="card-text">
						${this.lunchHTML}
					</p>
				</div>
				<div class="card-body">
					<h5 class="card-title">${lang.labels.dinner}</h5>
					<p class="card-text">
						${this.dinnerHTML}
					</p>

				</div>
			</div>
		`;
	}

	render() {
		
		return this.html();
	}
}