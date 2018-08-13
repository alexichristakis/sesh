import { connect } from 'react-redux'

import Home from './components/Home'

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
​
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
​
const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
​
export default HomeContainer
