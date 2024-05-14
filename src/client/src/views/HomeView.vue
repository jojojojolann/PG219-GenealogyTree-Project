<template>
  <br>
  <br>
  <div class="container">
    <div class="formBox">
      <div class="form">
        <form @submit.prevent="handleAddButton">
          <h3>Add a Family Member</h3>
          <input type="text" v-model="firstname" placeholder="First Name" required />
          <input type="text" v-model="lastname" placeholder="Last Name" required />
          <input type="text" v-model="birthdate" placeholder="Birthday (dd/mm/yyyy)" required />
          <input type="text" v-model="deathdate" placeholder="Deathday (dd/mm/yyyy)" />
          <select id="gender" name="gender">
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="Abinary">Abinary</option>
            <option value="Agender">Agender</option>
            <option value="Ambigender">Ambigender</option>
            <option value="Bigender">Bigender</option>
            <option value="Binary">Binary</option>
            <option value="Cisgender">Cisgender</option>
            <option value="Demigender">Demigender</option>
            <option value="Dual gender">Dual gender</option>
            <option value="Eunuch">Eunuch</option>
            <option value="Gender diverse">Gender diverse</option>
            <option value="Genderless">Genderless</option>
            <option value="Genderqueer">Genderqueer</option>
            <option value="Intersex">Intersex</option>
            <option value="Multigender">Multigender</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Omnigender">Omnigender</option>
            <option value="Pangender">Pangender</option>
            <option value="Polygender">Polygender</option>
            <option value="Queer">Queer</option>
            <option value="Third gender">Third gender</option>
            <option value="Trans">Transgedner</option>
            <option value="Transsexual">Transsexual</option>
            <option value="Travesti">Travesti</option>
            <option value="Trigender">Trigender</option>
            <option value="Vakasalewalewa">Vakasalewalewa</option>
            <option value="Waria">Waria</option>
            <option value="X-gender">X-gender</option>
          </select>
          <input type="submit" value="Add" :disabled="loading" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
  name: 'FrontPage',
  data() {
    return {
      loading: false,
      persons: [],
      firstname: '',
      lastname: '',
      gender: '',
      birthdate: '',
      deathdate: '',
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
      console.log('true');
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
            this.$router.push(`/${response.data.id}`);
          }
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },
  },
  async created() {
    await this.fetchPersons();
    this.persons = this.$store.state.Persons.persons;
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 60%;
  height: 100vh;
  background-color: #2c7056;
  color: #333
}

.formBox {
  background-color: #ebf4f3;
  width: 70%;
  height: 70%;
  padding: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  align-items: center;
  display: flex;
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
</style>
