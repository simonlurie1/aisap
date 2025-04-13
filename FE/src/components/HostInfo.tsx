import react from 'react';

interface Props {
  internalIp: string;
  publicIp: string;
}

const HostInfo: react.FC<Props> = ({ internalIp, publicIp }) => {
  return (
    <div>
      <div className="personalIps">
        <h2>Your Host Information</h2>
        <p>
          <span className="label">Internal IP:</span>
          <span className="value">{internalIp}</span>
        </p>
        <p>
          <span className="label">Public IP:</span>
          <span className="value">{publicIp}</span>
        </p>
      </div>
    </div>
  );
};

export default HostInfo;
