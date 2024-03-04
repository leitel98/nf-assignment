const SampleCard = ({
  sample,
  setSamples,
}: {
  sample: any;
  setSamples: (prev: any) => void;
}) => {
  const deleteSample = async (id: number) => {
    try {
      await fetch('/api/delete-sample', {
        body: JSON.stringify(id),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      });
      setSamples((prev: any) => {
        return prev.filter(
          (existingSample: any) => existingSample.id != sample.id
        );
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='flex items-center justify-between bg-teal-600/30 rounded-md px-4 py-2 border-b border-r border-teal-600'>
      <div className='flex items-center w-full gap-4'>
        <p>
          {sample.createdAt?.getDate()}/{sample.createdAt?.getMonth() + 1}/
          {sample.createdAt?.getFullYear()}
        </p>
        <p>🧪 Carbon: {sample.amount} kg</p>
        <p>
          🧭 Lat: {sample.position?.latitude.toFixed(2)} | Lon:{' '}
          {sample.position?.longitude.toFixed(2)}
        </p>
      </div>
      <div className='flex items-center'>
        <button>✏️</button>
        <button onClick={() => deleteSample(sample.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default SampleCard;
