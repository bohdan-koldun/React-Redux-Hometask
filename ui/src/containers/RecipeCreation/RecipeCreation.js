import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import { isRecipesFetching } from './../Recipes/RecipesReducer';
import { addRecipe } from '../Recipes/RecipesActions';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

class Recipe extends React.Component {

    handleSubmit = data => {
        this.props.actions.addRecipe(data);
    }

    handleCancel = () => {
        this.props.history.push(`/recipes`);
    }

    render() {
        const {isFetching} = this.props;

        return <Container>
            <Grid columns={2} centered >
            <Grid.Column>
                <RecipeForm
                disabled ={isFetching}
                title="Add new recipe"
                onSubmit={this.handleSubmit}
                onCancel={this.handleCancel}
                submitButtonTitle ="Add recipe"
                submitButtonIcon="plus"
                cancelButtonTitle="Go back"
                cancelButtonIcon="arrow left"
                />
            </Grid.Column>
            </Grid>
        </Container>
    }
}

Recipe.propTypes = {
    isFetching: PropTypes.bool, 
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isFetching: isRecipesFetching(state)
});

const mapDispatchToProps =  dispatch => ({
    actions: bindActionCreators({addRecipe}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);