export default {
    namespaced: true,
    state: {
      data: [],
    },
    mutations: {
        ADD_WORK(state, newWork) {
            state.data.push(newWork);
        },
        SET_WORKS(state, works) {
            state.data = works
        },
        REMOVE_WORK(state, id) {
            state.data = state.data.filter(work => work.id !== id);
        },
        EDIT_WORK(state, workEdited) {
            state.data = state.data.map(work => {
                if(work.id == workEdited.work.id) {
                  work = workEdited.work;
                }
                return work;
            });
        }
    },
    actions: {
        async add({ commit }, newWork) {
            const formData = new FormData();
        
            Object.keys(newWork).forEach(item => {
            formData.append(item, newWork[item]);
            })
  
            try {
                const { data } = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            } catch (error) {
                console.log("error");
            }
        },
        async fetch({commit}) {
            try {
                const { data } = await this.$axios.get("/works/461");
                commit("SET_WORKS", data);
            } catch (error) {
                console.log("error");
            }
        },
        async remove(store, id) {
            try {
                const response = await this.$axios.delete(`/works/${id}`);
                store.commit('REMOVE_WORK', id);
            } catch (error) {
                throw new Error('Ошибка удаления работы');
            }
        },
        async edit({ commit }, work) {
            const formData = new FormData();
                
            Object.keys(work).forEach(item => {
                formData.append(item, work[item]);
            })
            try {
                const { data } = await this.$axios.post(`/works/${work.id}`, formData);
                commit("EDIT_WORK", data);
                return data;
            } catch (error) {
                throw new Error('Ошибка редактирования работы');
            }
        }
    },
  };
  