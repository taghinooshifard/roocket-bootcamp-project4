import PropTypes from 'prop-types'
import Dashboard from '../pages/Dashboard';
import Report from '../pages/Report';
export const Pages = Object.freeze({
    Dashboard: 'Dashboard',
    Report: 'Report',

  })
function withPages(selectedPage) {
    switch (selectedPage) {
        case Pages.Dashboard:
            return <Dashboard/>
        case Pages.Report:
            return <Report/>
        default:
            return <Dashboard/>

    }

}
withPages.propTypes={
    selectedPage : PropTypes.string
}
export default withPages
