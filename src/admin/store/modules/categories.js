export  default { 
    namespaced: true,
    state: {
        data: []
    },
 
    mutations: {
        SET_CATEGORIES: (state, categories)  => (state.data = categories) ,
        
        ADD_CATEGORY(state, category) {
            category.skills = [];
            state.data.unshift(category);
        },
        DELETE_CATEGORY: (state, id) => {
            state.data = state.data.filter(category => category.id !== id);
        },
        EDIT_CATEGORY(state, editedCategory) {
            state.data = state.data.map(category => {
                if(category.id === editedCategory.category.id) {
                    category = editedCategory.category;
                }
                return category;
            });
        },
        ADD_SKILL:  (state, newSkill) => {
            state.data = state.data.map(category => {
                //console.log(newSkill.category);
                if (category.id === newSkill.category) {
                    category.skills.push(newSkill);
                }
                return category;
            })
        },
        
        REMOVE_SKILL: (state, skillToRemove) => {
            state.data = state.data.map(category => {
                if (category.id === skillToRemove.category) {
                    category.skills = category.skills.filter( skill =>  {
                        return skill.id != skillToRemove.id
                    });
                }
                return category;
            })
        },
        EDIT_SKILL: (state, skillToEdit) => {
            const editSkillInCategory = category => {
              category.skills = category.skills.map(skill => {
                return skill.id === skillToEdit.id ? skillToEdit : skill
              });
            }
      
            const findCategory = category => {
              if (category.id === skillToEdit.category) {
                editSkillInCategory(category);
              }
      
              return category;
            }
            state.data = state.data.map(findCategory);
        }
    },
    actions: {
        async  fetch({commit}) {
            try {
                const {data} = await this.$axios.get('/categories/461');
                commit("SET_CATEGORIES",  data);
            } catch (error) {
             console.log(error);
            }
        },
       async  create({commit}, title) {
           try {
               const { data } = await this.$axios.post('/categories', {title});
               commit("ADD_CATEGORY", data)
           } catch (error) {
                console.log(error);
           }
        },
        async deleteCategory({commit}, id) {
            try {
                await this.$axios.delete(`/categories/${id}`);
                commit('DELETE_CATEGORY', id);
            } catch (error) {
                console.log(error);
                //throw new Error('Ошибка удаления отзыва');
            }
                /*const response = await this.$axios.delete(`/categories/${id}`);
                console.log(response);
                console.log(id);
                commit('DELETE_CATEGORY', id);
                console.log('test');*/

        },
        async editCategory({commit}, category) {
            try {
                const {data} = await this.$axios.post(`/categories/${category.id}`, {title: category.title});
                commit('EDIT_CATEGORY', data);
                console.log(data);
                console.log("Категория изменена editCategory action");
            } catch (error) {
                console.log(error);
                //throw new Error('Ошибка редактирования категории');
            }
        },
        
        
    }
}