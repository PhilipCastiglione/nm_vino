class RootNode extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      data: JSON.parse(props['data']),
      selectedMeasure: null,
      selectedDisease: null,
      selectedMetricCategory: null,
      selectedMetric: null,
      pageTitle: 'Measures',
      path: [] 
    }
  }
  selectMeasure(measureId) {
    let m = this.state.data['measures'].filter ( measure => {
      return measure['id'] === measureId;
    })[0];
    this.setState({'selectedMeasure': m});
  }
  selectDisease(diseaseId) {
    let d = this.state.selectedMeasure['diseases'].filter ( disease => {
      return disease['id'] === diseaseId;
    })[0];
    this.setState({'selectedDisease': d});
    // now we set the first metric category and metric  automatically
    let mc = d['metric_categories'][0];
    this.setState({'selectedMetricCategory': mc});
    let m = mc['metrics'][0];
    this.setState({'selectedMetric': m});
  }
  selectMetricDetail(metricDetailId) {
    console.log(metricDetailId);
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
        <Header pageTitle={this.state.pageTitle} path={this.state.path} />
        {selector}
      </div>
    );
  }
}

RootNode.propTypes = {
  data: React.PropTypes.string
};


