import { FieldArray } from 'formik';
import AccountFields from './AccountFields';
import FieldsContainer from './FieldsContainer';

const Accounts = () => {
  return (
    <FieldArray name="accounts">
      {() => (
        <FieldsContainer>
          <AccountFields index={0} />
          <AccountFields index={1} />
          <AccountFields index={2} />
          <AccountFields index={3} />
        </FieldsContainer>
      )}
    </FieldArray>
  );
};

export default Accounts;
