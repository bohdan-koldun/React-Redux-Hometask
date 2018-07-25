import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Divider, Image, Grid, Segment } from 'semantic-ui-react';
import { fetchAllRecipes, deleteRecipe, updateRecipeRating } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import logo from '../../images/logo.png';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeListHeader from '../../components/RecipeList/RecipeListHeader';
import EmptyRecipeList from '../../components/RecipeList/EmptyRecipeList';
import EmptySearchResult from '../../components/RecipeSearch/EmptySearchResult';
import RecipeModal from '../../components/RecipeModal/RecipeModal';
import AllRecipeListModal from '../../components/RecipeModal/AllRecipeListModal';

class Recipes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRecipe: null,
            listRecipe: null,
            searchKey: '',
            ratingFilter: 'none'
        };
    }

    componentDidMount() {
        this.props.actions.fetchAllRecipes();
    }

    handleSearch = _searchKey => {
        this.setState({
            searchKey: _searchKey
        });
    }

    handleRatingFilter = filter => {
        this.setState({
            ratingFilter: filter
        });

        if (filter === 'none')
            this.props.history.push(`/recipes`);
    }

    filterRecipeListBySearch(allRecipes, keyWord) {
        return allRecipes.filter(function (item) {
            return item.title.toLowerCase().search(keyWord.toLowerCase()) !== -1;
        });
    }

    filterRecipeListByRating(allRecipes, filter) {
        if (filter === 'increasing')
            return allRecipes.sort((a, b) => {
                return a.rating - b.rating;
            });
        else if (filter === 'descending')
            return allRecipes.sort((a, b) => {
                return b.rating - a.rating;
            });
        else
            return allRecipes;
    }

    handleEdit = id => {
        this.props.history.push(`/recipes/${id}`);
    }

    handleDelete = id => {
        this.props.actions.deleteRecipe(id);
    }

    handleChangeRating = (id, rating) => {
        let recipe = this.props.allRecipes.find(r => r._id === id);
        recipe.rating = rating;
        this.props.actions.updateRecipeRating(recipe);
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
        this.toggleRecipeModal(false);
    }

    toggleRecipeListModal = (show) => {
        if (show) {
            this.setState({
                listRecipe: this.props.allRecipes
            });
        }
        else {
            this.setState({
                listRecipe: null
            });
        }
    }

    handleModalListClose = () => {
        this.toggleRecipeListModal(false);
    }

    render() {
        const { isFetching, allRecipes } = this.props;
        const { activeRecipe, searchKey, ratingFilter, listRecipe } = this.state;

        let allRecipesFiltered = allRecipes;

        if (searchKey !== '')
            allRecipesFiltered = this.filterRecipeListBySearch(allRecipes, searchKey);


        if (ratingFilter === 'descending' || ratingFilter === 'increasing')
            allRecipesFiltered = this.filterRecipeListByRating(allRecipesFiltered, ratingFilter);




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
                                        <RecipeListHeader
                                            onSearch={this.handleSearch}
                                            onChooseFilter={this.handleRatingFilter}
                                            onCreate={this.handleRecipeCreate}
                                            onViewAll = {this.toggleRecipeListModal}
                                            listLength={allRecipesFiltered.length}
                                        />
                                        <Divider />
                                        {
                                            !!allRecipesFiltered.length
                                                ? <RecipeList
                                                    recipes={allRecipesFiltered}
                                                    onRate={this.handleChangeRating}
                                                    onView={this.toggleRecipeModal}
                                                    onEdit={this.handleEdit}
                                                    onDelete={this.handleDelete}
                                                />
                                                : <EmptySearchResult />
                                        }
                                    </React.Fragment>
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <AllRecipeListModal recipes={listRecipe} onClose={this.handleModalListClose} />
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
    actions: bindActionCreators({ fetchAllRecipes, deleteRecipe, updateRecipeRating }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);