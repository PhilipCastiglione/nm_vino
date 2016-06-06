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
      selectedMetricDetails: []
    }
  }
  selectMeasure(measureId) {
    let m = this.state.data['measures'].find(measure => { return measure['id'] === measureId; });
    this.setState({'selectedMeasure': m});
  }
  selectDisease(diseaseId) {
    let d = this.state.selectedMeasure['diseases'].find(disease => { return disease['id'] === diseaseId; });
    this.setState({'selectedDisease': d});
    // now we set the first metric category and metric automatically
    let mc = d['metric_categories'][0];
    this.setState({'selectedMetricCategory': mc});
    let m = mc['metrics'][0];
    this.setState({'selectedMetric': m});
  }
  selectMetricDetail(metricDetailId) {
    let md = this.state.selectedMetric['metric_details'].find(metric_detail => { return metric_detail['id'] === metricDetailId; });
    if (md['metric_subdetails'].length > 0) {
      console.log('show subdetails');
      // TODO: if it has metricSubdetails, show them
    } else {
      this.state.selectedMetricDetails.push(metricDetailId);
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
    this.setState({'selectedMetricCategory': mc});
    let m = mc['metrics'][0];
    this.setState({'selectedMetric': m});
  }
  decrementCategory() {
    let idx = this.state.selectedDisease['metric_categories'].indexOf(this.state.selectedMetricCategory);
    let mc = this.state.selectedDisease['metric_categories'][--idx];
    this.setState({'selectedMetricCategory': mc});
    let m = [...mc['metrics']].pop();
    this.setState({'selectedMetric': m});
  }
  completeScoring() {
    console.log('all done');
    console.log(this.state.selectedMetricDetails);
    // TODO: present confirm, post the ids to the end point for the scores actually maybe get with query params will be easiest
  }
  back() {
    if (this.state.selectedMetricDetails.length > 0) {
      let mds = this.state.selectedMetricDetails;
      mds.pop();
      this.setState({'selectedMetricDetails': mds});
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
  render () {
    if (this.state.selectedMeasure === null) {
      let measures = this.state.data['measures'];
      var selector = <MeasureSelector sendId={this.selectMeasure.bind(this)} measures={measures} />;
    } else if (this.state.selectedDisease === null) {
      let diseases = this.state.selectedMeasure['diseases'];
      var selector = <DiseaseSelector sendId={this.selectDisease.bind(this)} diseases={diseases} />;
    } else {
      let metricDetails = this.state.selectedMetric['metric_details'];
      var selector = <MetricDetailSelector sendId={this.selectMetricDetail.bind(this)} metricCategory={this.state.selectedMetricCategory} metric={this.state.selectedMetric} metricDetails={metricDetails} />;
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


