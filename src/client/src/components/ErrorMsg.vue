<template>
    <div class="alert alert-danger">
        {{ msg }}
    </div>
</template>

<script>
export default {
    props: ["msg"]
};
</script>

<style scoped>
.alert {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    text-align: center;
}
.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
</style>