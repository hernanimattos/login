<script>
import Field from 'buefy/src/components/field/Field';

export default {
  name: 'l-field',
  extends: Field,
  methods: {
    messageChange(newMessage) {
      this.newMessage = newMessage;
    },
    typeChange(newType) {
      this.newType = newType;
    }
  }
};
</script>
