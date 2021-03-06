import React, { Component } from 'react'
import { connect } from 'react-redux'
import screenTypes from '../utils/screenTypes.js'
import actions, { fetchGist } from '../actions/actions.js'

const mapStateToProps = ({ gist, booted, token }) => ({
  gist,
  booted,
  token
})

const mapDispatchToProps = dispatch => ({
  setScreen: screen => dispatch(actions.setScreen(screen)),
  fetchGist: ({ id, token }) => dispatch(fetchGist({ id, token }))
})

class Boot extends Component {
  componentDidMount () {
    const { fetchGist, token, setScreen } = this.props

    const { search } = window.location
    const params = new window.URLSearchParams(search)
    const id = params.get('id')
    // If there's an id in the query string,
    if (id) {
      // try fetching the gist.
      fetchGist({ id, token })
    } else {
      // If there is no id,
      // show home.
      setScreen(screenTypes.HOME)
    }
  }

  componentDidUpdate () {
    const { gist, setScreen, booted } = this.props

    // If we are done fetching, and we have a gist,
    // AND we are done booting,
    if (!gist.isFetching && gist.data && booted) {
      // set screen to RUN.
      setScreen(screenTypes.RUN)
    }
  }

  render () {
    return <div className='Boot' />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boot)
