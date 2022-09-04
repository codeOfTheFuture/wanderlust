interface Data {
  signature: string;
  timestamp: string;
}

const getSignature = async () => {
  const response = await fetch("/api/cloudinarySign"),
    data = await response.json(),
    { signature, timestamp }: Data = data;

  return { signature, timestamp };
};

export default getSignature;
