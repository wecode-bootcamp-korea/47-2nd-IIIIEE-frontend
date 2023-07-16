import { styled } from 'styled-components';

const Tag = ({ cathegorys, tags }) => {
  return (
    <Container>
      <Cathegorys>
        {cathegorys?.map((cathegory, idx) => {
          return <EachCathegorys key={idx}>{cathegory}</EachCathegorys>;
        })}
      </Cathegorys>
      <Cathegorys>
        {tags?.map((tag, idx) => {
          return <EachTags key={idx}>{tag}</EachTags>;
        })}
      </Cathegorys>
    </Container>
  );
};

export default Tag;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EachCathegorys = styled.div`
  background-color: #ffb282;
  border-radius: 7px;
  padding: 7px;
  color: white;
`;

const EachTags = styled.div`
  background-color: #ffdc82;
  border-radius: 7px;
  padding: 7px;
  color: white;
`;

// const Tags = styled.div`
//   display: flex;
//   gap: 10px;
// `;
const Cathegorys = styled.div`
  display: flex;
  gap: 10px;
`;
