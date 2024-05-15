<template>
    <div class="family-member">
        <div class="member-details">
            <h3>{{ member.name }}</h3>
            <p>Age: {{ member.age }}</p>
        </div>
        <div v-if="member.children && member.children.length" class="member-children">
            <FamilyMember v-for="child in member.children" :key="child.id" :member="child" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'FamilyMember',
    data() {
        return {
            familyRoot: {
                name: "John Doe",
                age: 50,
                id: 1,
                children: [
                    {
                        name: "Jane Doe",
                        age: 30,
                        id: 2,
                        children: [
                            {
                                name: "Jim Doe",
                                age: 10,
                                id: 3,
                                children: []
                            }
                        ]
                    }
                ]
            }
        };
    }

    props: {
        member: {
            type: Object,
            required: true
        }
    },
    components: {
        FamilyMember
    }
}
</script>

<style scoped>
.family-member {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
}

.member-details h3 {
    color: #2c7056;
}
</style>