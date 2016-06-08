class RootNode extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      patientName: null,
      data: JSON.parse(props['data']),
      selectedMeasure: null,
      selectedDisease: null,
      selectedMetricCategory: null,
      selectedMetric: null,
      metricDetailIds: [],
      finished: null
    }
  }
  path() {
    let path = "> ";
    if (this.state.patientName) {
      path += this.state.patientName;
      if (this.state.selectedMeasure) { 
        path += " > " + this.state.selectedMeasure.title;
        if (this.state.selectedDisease) {
          path += " > " + this.state.selectedDisease.title + " > " + this.state.selectedMetricCategory.title + " > " + this.state.selectedMetric.title;
        }
      }
    }
    return path;
  }
  enterName(name) {
    this.setState({patientName: name });
  }
  selectMeasure(measureId) {
    let m = this.state.data['measures'].find(measure => { return measure['id'] === measureId; });
    this.setState({selectedMeasure: m});
    if (m['diseases'].length === 1) {
      this.selectDisease(m['diseases'][0]['id']);
    }
  }
  selectDisease(diseaseId) {
    let d = this.state.selectedMeasure['diseases'].find(disease => { return disease['id'] === diseaseId; });
    let mc = d['metric_categories'][0];
    let m = mc['metrics'][0];
    this.setState({
      selectedDisease: d,
      selectedMetricCategory: mc,
      selectedMetric: m
    });
  }
  addMetricDetailOrSubdetailId(id, type) {
    this.state.metricDetailIds.push([id, type]);
    if (!this.lastMetricInCategory()) {
      this.incrementMetric();
    } else {
      if (!this.lastCategoryInDisease()) {
        this.incrementCategory();
      } else {
        this.submitScoring();
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
    this.setState({selectedMetric: m});
  }
  decrementMetric() {
    let idx = this.state.selectedMetricCategory['metrics'].indexOf(this.state.selectedMetric);
    let m = this.state.selectedMetricCategory['metrics'][--idx];
    this.setState({selectedMetric: m});
  }
  incrementCategory() {
    let idx = this.state.selectedDisease['metric_categories'].indexOf(this.state.selectedMetricCategory);
    let mc = this.state.selectedDisease['metric_categories'][++idx];
    let m = mc['metrics'][0];
    this.setState({
      selectedMetricCategory: mc,
      selectedMetric: m
    });
  }
  decrementCategory() {
    let idx = this.state.selectedDisease['metric_categories'].indexOf(this.state.selectedMetricCategory);
    let mc = this.state.selectedDisease['metric_categories'][--idx];
    let m = [...mc['metrics']].pop();
    this.setState({
      selectedMetricCategory: mc,
      selectedMetric: m
    });
  }
  deleteLastMetricDetail() {
    let metricDetailIds = this.state.metricDetailIds;
    metricDetailIds.pop();
    this.setState({metricDetailIds: metricDetailIds});
  }
  back() {
    if (this.state.metricDetailIds.length > 0) {
      if (this.state.finished) {
        this.setState({
          patientName: null,
          selectedMeasure: null,
          selectedDisease: null,
          selectedMetricCategory: null,
          selectedMetric: null,
          metricDetailIds: [],
          finished: null
        });
      }
      this.deleteLastMetricDetail();
      if (this.firstMetricInCategory()) {
        this.decrementCategory();
      } else {
        this.decrementMetric();
      }
    } else if (this.state.selectedDisease !== null) {
      this.setState({selectedDisease: null});
    } else if (this.state.selectedMeasure !== null) {
      this.setState({selectedMeasure: null});
    } else {
      this.setState({patientName: null});
    }
  }
  submitScoring() {
    $('.loading').show();
    let data = {
      data: this.state.metricDetailIds,
      measureId: this.state.selectedMeasure['id'],
      diseaseId: this.state.selectedDisease['id']
    };
    $.post('/scores', data)
      .done((result) => { this.updateLocalScores(result); })
      .fail((error) => { 
        alert("IMPORTANT: There was an error but your results have not been lost. Please contact the developer (ideally with photo or screenshot). You must refresh the page to continue. Server error: " + error);
        let timestamp = new Date();
        localStorage.setItem('error: ' + this.state.patientName + timestamp, this.state.metricDetailIds);
      })
      .always(() => { $('.loading').hide() });
  }
  updateLocalScores(scoreResponse) {
    let newScore = scoreResponse;
    newScore['name'] = this.state.patientName;
    newScore['date'] = new Date();
    let scores = JSON.parse(localStorage.getItem('scores:' + this.state.selectedMeasure['title'])) || {};
    if (Object.keys(scores).length > 0) {
      var id = Math.max(...Object.keys(scores).map(s => { return parseInt(s, 10); })) + 1;
    } else {
      var id = 1;
    }
    scores[id] = newScore;
    localStorage.setItem('scores:' + this.state.selectedMeasure['title'], JSON.stringify(scores));
    this.setState({finished: true});
  }
  render () {
    if (!this.state.patientName) {
      var selector = <PatientName enterName={this.enterName.bind(this)} pageTitle="Enter Name" />;
    }  else if (!this.state.selectedMeasure) {
      let measures = this.state.data['measures'];
      var selector = <TopLevelSelector selectRecord={this.selectMeasure.bind(this)} records={measures} pageTitle="Measures" />;
    } else if (!this.state.selectedDisease) {
      let diseases = this.state.selectedMeasure['diseases'];
      var selector = <TopLevelSelector selectRecord={this.selectDisease.bind(this)} records={diseases} pageTitle="Diseases" />;
    } else if (!this.state.finished) {
      let metricDetails = this.state.selectedMetric['metric_details'];
      var selector = <MetricDetailSelector addId={this.addMetricDetailOrSubdetailId.bind(this)} metricCategory={this.state.selectedMetricCategory} metric={this.state.selectedMetric} metricDetails={metricDetails} />;
    } else {
      let scores = JSON.parse(localStorage.getItem('scores:' + this.state.selectedMeasure['title']));
      let id = Math.max(...Object.keys(scores).map(s => { return parseInt(s, 10); }));
      let lastScore = scores[id];
      var selector = <Report date={lastScore['date']} name={lastScore['name']} total={lastScore['total']} max={this.state.selectedMeasure['max']} sections={lastScore['report']} pageTitle={this.state.selectedMeasure['title'] + ' Measure Report'} />;
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
