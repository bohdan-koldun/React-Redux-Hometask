import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import { fetchRecipe, updateRecipe } from '../Recipes/RecipesActions';
import { isRecipesFetching, activeRecipe } from '../Recipes/RecipesReducer';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

class RecipeEditing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeToFetch: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.recipeToFetch !== props.match.params.id) {
            return {
                recipeToFetch: props.match.params.id
            };
        }
        return null;
    }

    componentDidMount() {
        if (this.state.recipeToFetch) {
            this.props.actions.fetchRecipe(this.state.recipeToFetch);
        }
    }

    componentDidUpdate() {
        if (this.props.recipe && (this.state.recipeToFetch !== this.props.recipe._id)) {
            this.props.actions.fetchRecipe(this.state.recipeToFetch);
        }
    }


    handleSubmit = data => {
        this.props.actions.updateRecipe({
            ...this.props.recipe,
            ...data
        });
    }

    handleCancel = () => {
        this.props.history.push(`/recipes`);
    }

    render() {
        const { isFetching, recipe } = this.props;

        return <Container>
            <Grid centered columns={2}>
                <Grid.Column>
                {
                   !!recipe && <RecipeForm
                        disabled={isFetching}
                        title="Edit recipe"
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleCancel}
                        submitButtonTitle="Update recipe"
                        initialValues={recipe}
                        submitButtonIcon="save outline"
                        cancelButtonTitle="Go back to recipes"
                        cancelButtonIcon="arrow left"

                    />
                }
                </Grid.Column>
            </Grid>
        </Container>
    }
}

RecipeEditing.propTypes = {
    recipe: PropTypes.object,
    isFetching: PropTypes.bool,
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recipe: activeRecipe(state),
    isFetching: isRecipesFetching(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ fetchRecipe, updateRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditing);