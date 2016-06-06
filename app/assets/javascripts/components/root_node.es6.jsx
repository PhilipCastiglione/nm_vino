class RootNode extends React.Component {
  path() {
    let path = "";
    if (this.state.selectedMeasure) { 
      path += this.state.selectedMeasure.title;
      if (this.state.selectedDisease) {
        path += " > " + this.state.selectedDisease.title + " > " + this.state.selectedMetricCategory.title + " > " + this.state.selectedMetric.title;
      }
    }
    return path;
  }
  constructor(props) {
    super();
    this.state = { 
      data: JSON.parse(props['data']),
      selectedMeasure: null,
      selectedDisease: null,
      selectedMetricCategory: null,
      selectedMetric: null,
      scores: []
    }
  }
  selectMeasure(measureId) {
    let m = this.state.data['measures'].find(measure => { return measure['id'] === measureId; });
    this.setState({'selectedMeasure': m});
    if (m['diseases'].length === 1) {
      this.selectDisease(m['diseases'][0]['id']);
    }
  }
  selectDisease(diseaseId) {
    let d = this.state.selectedMeasure['diseases'].find(disease => { return disease['id'] === diseaseId; });
    let mc = d['metric_categories'][0];
    let m = mc['metrics'][0];
    this.setState({
      'selectedDisease': d,
      'selectedMetricCategory': mc,
      'selectedMetric': m
    });
  }
  addScore(score) {
    this.state.scores.push(score);
    if (!this.lastMetricInCategory()) {
      this.incrementMetric();
    } else {
      if (!this.lastCategoryInDisease()) {
        this.incrementCategory();
      } else {
        this.completeScoring();
      }
    }
  }
  selectMetricSubdetail(metricSubdetailId) {
  }
  firstMetricInCategory() {
    return this.state.selectedMetric === this.state.selectedMetricCategory['metrics'][0];
  }
  lastMetricInCategory() {
    return this.state.selectedMetric === [...this.state.selectedMetricCategory['metrics']].pop();
  }
  lastCategoryInDisease() {
    return this.state.selectedMetricCategory === [...this.state.selectedDisease['metric_categories']].pop();
  }
  incrementMetric() {
    let idx = this.state.selectedMetricCategory['metrics'].indexOf(this.state.selectedMetric);
    let m = this.state.selectedMetricCategory['metrics'][++idx];
    this.setState({'selectedMetric': m});
  }
  decrementMetric() {
    let idx = this.state.selectedMetricCategory['metrics'].indexOf(this.state.selectedMetric);
    let m = this.state.selectedMetricCategory['metrics'][--idx];
    this.setState({'selectedMetric': m});
  }
  incrementCategory() {
    let idx = this.state.selectedDisease['metric_categories'].indexOf(this.state.selectedMetricCategory);
    let mc = this.state.selectedDisease['metric_categories'][++idx];
    let m = mc['metrics'][0];
    this.setState({
      'selectedMetricCategory': mc,
      'selectedMetric': m
    });
  }
  decrementCategory() {
    let idx = this.state.selectedDisease['metric_categories'].indexOf(this.state.selectedMetricCategory);
    let mc = this.state.selectedDisease['metric_categories'][--idx];
    let m = [...mc['metrics']].pop();
    this.setState({
      'selectedMetricCategory': mc,
      'selectedMetric': m
    });
  }
  deleteLastMetricDetail() {
    let scores = this.state.scores;
    scores.pop();
    this.setState({'scores': scores});
  }
  back() {
    if (this.state.scores.length > 0) {
      this.deleteLastMetricDetail();
      if (this.firstMetricInCategory()) {
        this.decrementCategory();
      } else {
        this.decrementMetric();
      }
    } else if (this.state.selectedDisease !== null) {
      this.setState({'selectedDisease': null});
    } else {
      this.setState({'selectedMeasure': null});
    }
  }
  completeScoring() {
    console.log('all done');
    console.log(this.state.scores);
    // TODO: present confirm, post the ids to the end point for the scores actually maybe get with query params will be easiest
  }
  render () {
    if (this.state.selectedMeasure === null) {
      let measures = this.state.data['measures'];
      var selector = <TopLevelSelector sendId={this.selectMeasure.bind(this)} records={measures} pageTitle="Measures" />;
    } else if (this.state.selectedDisease === null) {
      let diseases = this.state.selectedMeasure['diseases'];
      var selector = <TopLevelSelector sendId={this.selectDisease.bind(this)} records={diseases} pageTitle="Diseases" />;
    } else {
      let metricDetails = this.state.selectedMetric['metric_details'];
      var selector = <MetricDetailSelector addScore={this.addScore.bind(this)} metricCategory={this.state.selectedMetricCategory} metric={this.state.selectedMetric} metricDetails={metricDetails} />;
    }

    return (
      <div>
        <Header path={this.path()} back={this.back.bind(this)} />
        {selector}
      </div>
    );
  }
}

RootNode.propTypes = {
  data: React.PropTypes.string
};
