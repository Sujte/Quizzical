function Answer(prop: {
  ans: string;
  isHeld: boolean;
  flip: () => void;
  key: string;
}) {
  const styles = {
    background: prop.isHeld ? "#d6dbf5" : "white",
    border: prop.isHeld ? "1px solid #f5f7fb" : "1px solid #4d5b9e",
  };

  return (
    <button type="button" className="ans" style={styles} onClick={prop.flip}>
      <p dangerouslySetInnerHTML={{ __html: prop.ans }}></p>
    </button>
  );
}
export default Answer;
