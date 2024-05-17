<template>
  <br>
  <br>
  <div class="fcontainer">
    <div class="formBox">
      <div class="form">
        <form @submit.prevent="handleAddButton">
          <h3>Add a Family Member</h3>
          <input type="text" v-model="firstname" placeholder="First Name" required />
          <input type="text" v-model="lastname" placeholder="Last Name" required />
          <input type="text" v-model="birthdate" placeholder="Birthday (dd/mm/yyyy)" required />
          <input type="text" v-model="deathdate" placeholder="Deathday (dd/mm/yyyy)" />
          <select id="gender" v-model="gender" name="gender">
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
          <input type="submit" value="Add" :disabled="loading" />
        </form>
      </div>
    </div>
    <section ref="treeMainContainer" class="treeMainContainer" @mousedown="handleMouseDown" @mousemove="handleMouseMove"
      @mouseup="handleMouseUp" @mouseleave="handleMouseUp">
      <div class="treeContainer d_f">
        <div class="_NewBranch d_f">
          <div class="_treeRoot d_f">
            <div class="_treeBranch hasChildren">
              <div class="_treeRaw d_f">
                <div class="_treeLeaf d_f">
                  <div class="t_Data d_f">
                    <p class="shortName">0</p>
                  </div>
                </div>
              </div>
              <div class="_NewBranch d_f">
                <div class="_treeRoot d_f">
                  <div class="_treeBranch hasChildren">
                    <div class="_treeRaw d_f">
                      <div class="_treeLeaf d_f">
                        <div class="t_Data d_f">
                          <p class="shortName">1</p>
                        </div>
                      </div>
                    </div>
                    <div class="_NewBranch d_f">
                      <div class="_treeRoot d_f">
                        <div class="_treeBranch">
                          <div class="_treeRaw d_f">
                            <div class="_treeLeaf d_f">
                              <div class="t_Data d_f">
                                <p class="shortName">2</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="_treeRoot d_f">
                        <div class="_treeBranch hasChildren">
                          <div class="_treeRaw d_f">
                            <div class="_treeLeaf d_f">
                              <div class="t_Data d_f">
                                <p class="shortName">3</p>
                              </div>
                            </div>
                          </div>
                          <div class="_NewBranch d_f">
                            <div class="_treeRoot d_f">
                              <div class="_treeBranch">
                                <div class="_treeRaw d_f">
                                  <div class="_treeLeaf d_f">
                                    <div class="t_Data d_f">
                                      <p class="shortName">5</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="_treeRoot d_f">
                  <div class="_treeBranch hasChildren">
                    <div class="_treeRaw d_f">
                      <div class="_treeLeaf d_f">
                        <div class="t_Data d_f">
                          <p class="shortName">6</p>
                        </div>
                      </div>
                    </div>
                    <div class="_NewBranch d_f">
                      <div class="_treeRoot d_f">
                        <div class="_treeBranch hasChild">
                          <div class="_treeRaw d_f">
                            <div class="_treeLeaf d_f">
                              <div class="t_Data d_f">
                                <p class="shortName">7</p>
                              </div>
                            </div>
                          </div>
                          <div class="_NewBranch d_f">
                            <div class="_treeRoot d_f">
                              <div class="_treeBranch">
                                <div class="_treeRaw d_f">
                                  <div class="_treeLeaf d_f">
                                    <div class="t_Data d_f">
                                      <p class="shortName">8</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="_treeRoot d_f">
                        <div class="_treeBranch">
                          <div class="_treeRaw d_f">
                            <div class="_treeLeaf d_f">
                              <div class="t_Data d_f">
                                <p class="shortName">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="container">
      <div class="row">
        <div class="col-md-3" v-for="person in listpersons" :key="person.id">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ person.firstname }} {{ person.lastname }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      loading: false,
      listpersons: [],
      firstname: '',
      lastname: '',
      birthdate: '',
      deathdate: '',
      gender: 'M',
      isDragging: false,
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
    };
  },
  methods: {
    ...mapActions(['fetchPersons']),
    handleAddButton() {
      if (!this.firstname || !this.lastname || !this.birthdate) {
        return alert("Fill out all of the input fields!");
      }

      if (!moment(this.birthdate, 'DD/MM/YYYY', true).isValid()) {
        return alert("Date of birth is not valid");
      }

      if (this.deathdate && !moment(this.deathdate, 'DD/MM/YYYY', true).isValid()) {
        return alert("Date of death is not valid");
      }

      this.loading = true;
      axios.post(`http://localhost:3000/api/persons/create/`, {
        firstname: this.firstname,
        lastname: this.lastname,
        gender: this.gender,
        birthdate: this.birthdate,
        deathdate: this.deathdate,
      })
        .then(response => {
          this.loading = false;
          if (response.status === 200) {
            this.fetchPersons(); // Refresh the list after adding a person
          }
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },
    handleMouseDown(event) {
      this.isDragging = true;
      this.startX = event.pageX - this.$refs.treeMainContainer.offsetLeft;
      this.startY = event.pageY - this.$refs.treeMainContainer.offsetTop;
      this.scrollLeft = this.$refs.treeMainContainer.scrollLeft;
      this.scrollTop = this.$refs.treeMainContainer.scrollTop;
    },
    handleMouseMove(event) {
      if (!this.isDragging) return;
      event.preventDefault();
      const x = event.pageX - this.$refs.treeMainContainer.offsetLeft;
      const y = event.pageY - this.$refs.treeMainContainer.offsetTop;
      const walkX = (x - this.startX) * 1.5; // Adjust the scroll speed
      const walkY = (y - this.startY) * 1.5;
      this.$refs.treeMainContainer.scrollLeft = this.scrollLeft - walkX;
      this.$refs.treeMainContainer.scrollTop = this.scrollTop - walkY;
    },
    handleMouseUp() {
      this.isDragging = false;
    },
  },
  computed: {
    localPersons() {
      return this.$store.state.Persons?.person;
    },
  },
  async created() {
    await this.fetchPersons();
    this.listpersons = this.localPersons;
  },
};
</script>


<style scoped>
.fcontainer {
  display: flex;
  gap: 10px;
}

.formBox {
  flex: 1;
  background-color: #ebf4f3;
  width: 30%;
  max-width: 30%;
  height: 60%;
  min-height: 60vh;
  padding: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  color: #333;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
}

select {
  width: 15%;
  padding: 10px;
  margin: 5px 0;
  min-width: fit-content;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
}

input[type="submit"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #2c7056;
  color: #fff;
  border: none;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #8cc9a5;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  /* colors */
  --black: #3e3e3e;
  --white: #ebf4f3;
  --baseBg: #ebf4f3;
  --green: #2c7056;
  --lightGreen: #8cc9a5;


  /* Animation */
  --transition: all 0.1s ease-in-out;

  /* font name */
  --roboto: 'Roboto', sans-serif;
  --borderGap: 25px;
}

body {
  font-size: 22px;
  line-height: 36px;
  color: #3e3e3e;
  font-family: var(--jameel);
  background-color: #ebf4f3;
}

.d_f {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}

section {
  width: 100%;
  position: relative;
  float: left;
  z-index: 0;
}

.treeMainContainer {
  flex: 1;
  margin: 0 auto;
  width: 70%;
  height: 60%;
  max-height: 60vh;
  background-color: #ebf4f3;
  overflow: hidden;
  position: relative;
}

.treeContainer {
  width: 150%;
  height: 150%;
  position: relative;
  padding: 50px;
  z-index: 0;
}

.treeMainContainer {
  cursor: grab;
}

.treeMainContainer:active {
  cursor: grabbing;
}

.treeMainContainer::-webkit-scrollbar {
  display: none;
}

.treeMainContainer:focus {
  outline: none;
}

.treeMainContainer {
  overflow: auto;
}

.treeContainer:active {
  cursor: grabbing;
}

._treeRoot {
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  z-index: 0;
}

._treeBranch {
  width: auto;
  height: min-content;
  position: relative;
  min-height: 20px;
  z-index: 0;
}

._treeRaw {
  position: relative;
  width: 100%;
  z-index: 0;
}

._treeRaw.active,
._treeRoot.active {
  z-index: 10;
}

._treeLeaf {
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 25px;
  z-index: 1;
  margin: 0 15px;
}

._treeData {
  min-width: 300px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #333;
  font-size: 20px;
  background-color: #fff;
  padding: 0 50px;
  white-space: nowrap;
  position: relative;
  text-align: center;
  margin-right: 10px;
  z-index: 0;
}

._treeData:last-child {
  margin-right: 0;
}

._NewBranch {
  position: relative;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
}

._NewBranch>div {
  flex: 1;
}

.t_Data {
  margin: 0 auto;
  position: relative;
  width: fit-content;
  min-width: 100px;
  height: 50px;
  background-color: #2c7056;
  color: #ebf4f3;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  transition: var(--transition);
  cursor: pointer;
  z-index: 1;
}

.t_Data p {
  flex: 1;
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.t_Data:hover,
.t_Data.active {
  background-color: #8cc9a5;
  color: #ebf4f3;
}

.t_Data:hover ._readMore,

.t_Data.active {
  background-color: #2c7056;
  z-index: 10;
}

.t_Data.active ._readMore {
  transform: rotate(0deg);
}

.t_Data.active .optnsCnt {
  display: block;
}

.t_Data.active .optnBx {
  margin-top: 0;
}

.optnsCnt {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  overflow: hidden;
}

.optnBx {
  position: relative;
  height: 65px;
  background-color: #ebf4f3;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 8px 6px;
  margin-bottom: 5px;
  margin-top: -200px;
  transition: var(--transition);
}

.optnBx::after {
  content: '';
  width: 1px;
  height: 20px;
  background-color: #333;
  position: absolute;
  left: calc(50% - 0.5px);
  top: calc(50% - 10px);
}

.optnBx a {
  flex: 1;
  position: relative;
  height: 100%;
  margin: 2px;
  line-height: 55px;
  border-radius: 5px;
  font-size: 24px;
  text-align: right;
  padding: 0 15px 0 10px;
  transition: var(--transition);
}

.optnBx a i {
  width: 30px;
  font-size: 22px;
  margin-left: 10px;
}

.optnBx a:hover {
  background-color: #2c7056;
  color: #ebf4f3;
}

.hasChild>._treeRaw::after,
.hasChildren>._treeRaw::after {
  content: '';
  width: 1px;
  height: 25px;
  position: absolute;
  top: calc(100% - 25px);
  left: calc(50% - 0.5px);
  background-color: #555;
}

.hasChild>._treeRaw:last-child::after {
  display: none;
}

.hasChildren>._NewBranch {
  padding-top: 25px;
}

.hasChildren>._NewBranch>._treeRoot::before,
.hasChildren>._NewBranch>._treeRoot::after {
  display: block;
}

._NewBranch>._treeRoot::before,
._NewBranch>._treeRoot::after {
  display: none;
  content: '';
  position: absolute;
  right: 50%;
  width: 50%;
  height: 25px;
  top: calc(0% - 25px);
  border-top: 1px solid #333;
}

._NewBranch>._treeRoot::before {
  right: 0;
}

._NewBranch>._treeRoot::after {
  left: 0;
}

._NewBranch>._treeRoot:first-child::after,
._NewBranch>._treeRoot:last-child::before {
  display: none;
}

.hasChildren>._NewBranch>._treeRoot ._treeLeaf::after {
  content: '';
  width: 1px;
  position: absolute;
  height: 25px;
  background-color: #333;
  bottom: 100%;
}
</style>
