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
            <Grid centered columns={2}>
            <Grid.Column>
                <RecipeForm
                disabled ={isFetching}
                title="Specify new recipe"
                onSubmit={this.handleSubmit}
                onCancel={this.handleCancel}
                submitButtonTitle ="Add recipe"
                submitButtonIcon="plus"
                cancelButtonTitle="Go back to recipes"
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