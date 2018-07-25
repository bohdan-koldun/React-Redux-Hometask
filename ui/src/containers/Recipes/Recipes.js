import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Divider, Image, Grid, Segment } from 'semantic-ui-react';
import { fetchAllRecipes, deleteRecipe } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import logo from '../../images/logo.png';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeListHeader from '../../components/RecipeList/RecipeListHeader';
import EmptyRecipeList from '../../components/RecipeList/EmptyRecipeList';
import EmptySearchResult from '../../components/RecipeSearch/EmptySearchResult';
import RecipeModal from '../../components/RecipeModal/RecipeModal';

class Recipes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRecipe: null,
            searchKey: ''
        };
    }

    componentDidMount() {
        this.props.actions.fetchAllRecipes();
    }

    handleSearch = _searchKey => {
        this.setState({
            searchKey: _searchKey
        });

        console.log(this.state.searchKey);
    }

    filterRecipeList(allRecipes, keyWord) {
        return allRecipes.filter(function (item) {
            return item.title.toLowerCase().search(keyWord.toLowerCase()) !== -1;
        });
        // this.setState({items: filteredList});
    }

    handleEdit = id => {
        this.props.history.push(`/recipes/${id}`);
    }

    handleDelete = id => {
        this.props.actions.deleteRecipe(id);
    }

    handleRecipeCreate = () => {
        this.props.history.push(`/recipes/new`);
    }

    toggleRecipeModal = id => {
        this.setState({
            activeRecipe: this.props.allRecipes.find(r => r._id === id)
        });
    }

    handleModalClose = () => {
        this.toggleRecipeModal(null);
    }

    render() {
        const { isFetching, allRecipes } = this.props;
        const { activeRecipe, searchKey } = this.state;

        let allRecipesFiltered = allRecipes;

        if (searchKey !== '')
            allRecipesFiltered = this.filterRecipeList(allRecipes, searchKey);

        return (<Container>
            <Grid centered columns={1}>
                <Grid.Column>
                    <Image src={logo} centered />
                </Grid.Column>
                <Grid.Row>
                    <Grid.Column>
                        <Segment raised padded textAlign="center" loading={isFetching}>
                            {
                                !allRecipes.length && !isFetching
                                    ? <EmptyRecipeList onCreate={this.handleRecipeCreate} />
                                    : <React.Fragment>
                                        <RecipeListHeader onSearch={this.handleSearch} onCreate={this.handleRecipeCreate} listLength={allRecipesFiltered.length} />
                                        <Divider />
                                        {
                                            !!allRecipesFiltered.length
                                                ? <RecipeList recipes={allRecipesFiltered} onView={this.toggleRecipeModal} onEdit={this.handleEdit} onDelete={this.handleDelete} />
                                                : <EmptySearchResult />
                                        }
                                    </React.Fragment>
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <RecipeModal recipe={activeRecipe} onClose={this.handleModalClose} />
        </Container>)
    }
}

RecipeList.PropTypes = {
    allRecipes: PropTypes.array,
    isFetching: PropTypes.bool,
    actions: PropTypes.object
}

const mapStateToProps = state => ({
    allRecipes: allRecipes(state),
    isFetching: isRecipesFetching(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ fetchAllRecipes, deleteRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);