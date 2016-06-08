class Report extends React.Component {
  render () {
    let sections = Object.keys(this.props.sections).map(metricCategory => {
      let metrics = this.props.sections[metricCategory];
      console.log(metrics);
      return Object.keys(metrics).map(metric => {
        if (metric === "total") {
        return (
            <tr>
              <td><strong>{metricCategory}</strong></td>
              <td><strong>TOTAL</strong></td>
              <td><strong>{this.props.sections[metricCategory][metric]} out of {this.props.sections[metricCategory]['max']}</strong></td>
            </tr>
          );
        } else if (metric !== "max") {
        return (
            <tr>
              <td>{metricCategory}</td>
              <td>{metric}</td>
              <td>{this.props.sections[metricCategory][metric]}</td>
            </tr>
          );
        }
      });
    });

    let tbody = (
      <tbody>
        {sections}
        <tr>
          <td><strong>ALL</strong></td>
          <td><strong>TOTAL</strong></td>
          <td><strong>{this.props.total} out of {this.props.max}</strong></td>
        </tr>
      </tbody>
    ); 

    return (
      <div>
        <h2>{this.props.pageTitle}</h2>
        <table>
          <thead>
            <tr>
              <th>{this.props.name}</th>
              <th>{(new Date(this.props.date)).toLocaleString()}</th>
              <th></th>
            </tr>
            <tr>
              <th>Metric Category</th>
              <th>Metric</th>
              <th>Score</th>
            </tr>
          </thead>
          {tbody}
        </table>
      </div>
    );
  }
}

Report.propTypes = {
  date: React.PropTypes.string,
  name: React.PropTypes.string,
  total: React.PropTypes.number,
  max: React.PropTypes.number,
  sections: React.PropTypes.object
};
