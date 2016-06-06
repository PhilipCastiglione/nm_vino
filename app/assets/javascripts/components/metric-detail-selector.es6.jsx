class MetricDetailSelector extends React.Component {
  addScore(event) {
    this.props.addScore(parseInt(event.nativeEvent.target.dataset.score, 10));
  }
  swap(event) {
    $target = $(event.nativeEvent.target);
    if (!$target.hasClass('selection')) {
      $target = $target.parent();
    }
    $target.find('span').hide();
    $target.find('div').slideDown(100);
  }
  render() {
    let metricDetails = this.props.metricDetails.map(metricDetail => {
      if (metricDetail['metric_subdetails'].length > 0 ) {
        let subdetails = metricDetail['metric_subdetails'].map(metricSubdetail => {
          return <div className="subselection" style={{display: 'none'}} onClick={this.addScore.bind(this)} data-score={metricSubdetail.score} key={metricSubdetail.id}>{metricSubdetail.description}</div>;
        });
        return <div className="selection" onClick={this.swap.bind(this)} data-score={metricDetail.score} key={metricDetail.id}>
                 <span onClick={this.swap.bind(this)}>{metricDetail.description}</span>
                 {subdetails}
               </div>;
      } else {
        return <div className="selection" onClick={this.addScore.bind(this)} data-score={metricDetail.score} key={metricDetail.id}>{metricDetail.description}</div>;
      }
    });

    return (
      <div>
        <h2>{this.props.metricCategory.title} - {this.props.metric.title}</h2>
        {metricDetails}
      </div>
    );
  }
}

MetricDetailSelector.propTypes = {
  metricDetails: React.PropTypes.array
};
