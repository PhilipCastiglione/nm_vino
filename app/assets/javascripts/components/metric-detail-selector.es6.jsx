class MetricDetailSelector extends React.Component {
  addScore(event) {
    this.props.addScore(parseInt(event.nativeEvent.target.dataset.score, 10));
  }
  swap(event) {
    $target = $(event.nativeEvent.target);
    $target.hide();
    $target.parent().find('div').slideToggle(100);
  }
  render() {
    let metricDetails = this.props.metricDetails.map(metricDetail => {
      if (metricDetail['metric_subdetails'].length > 0 ) {
        let subdetails = metricDetail['metric_subdetails'].map(metricSubdetail => {
          return <div style={{display: 'none'}} onClick={this.addScore.bind(this)} data-score={metricSubdetail.score} key={metricSubdetail.id}>{metricSubdetail.description}</div>;
        });
        return <div onClick={this.swap.bind(this)} data-score={metricDetail.score} key={metricDetail.id}>
                 <span>{metricDetail.description}</span>
                 {subdetails}
               </div>;
      } else {
        return <div onClick={this.addScore.bind(this)} data-score={metricDetail.score} key={metricDetail.id}>{metricDetail.description}</div>;
      }
    });

    return (
      <div>
        <h2>{this.props.metricCategory.title}</h2>
        <h3>{this.props.metric.title}</h3>
        {metricDetails}
      </div>
    );
  }
}

MetricDetailSelector.propTypes = {
  metricDetails: React.PropTypes.array
};
