import React, { useState } from 'react';
import styles from "./statusdropdown.module.css";


interface statusdropdownProps {
  currentStatus: 'Em_Andamento' | 'Pendente' | 'Pausado' | 'Fechado' | 'Cancelado';
  onChange: (newStatus: statusdropdownProps['currentStatus']) => void;
}

const statusOptions = [
  { label: 'Em Andamento', value: 'Em_Andamento', color: '#3498db' },
  { label: 'Pendente', value: 'Pendente', color: '#f39c12' },
  { label: 'Pausado', value: 'Pausado', color: '#e67e22' },
  { label: 'Fechado', value: 'Fechado', color: '#27ae60' },
  { label: 'Cancelado', value: 'Cancelado', color: '#c0392b' },
];

const StatusDropdown: React.FC<statusdropdownProps> = ({ currentStatus, onChange }) => {
  const [open, setOpen] = useState(false);

  const selected = statusOptions.find(s => s.value === currentStatus);

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.selected}
        style={{ backgroundColor: selected?.color }}
        onClick={() => setOpen(!open)}
      >
        {selected?.label}
      </div>
      {open && (
        <div className={styles.options}>
          {statusOptions.map(option => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => {
                onChange(option.value as statusdropdownProps['currentStatus']);
                setOpen(false);
              }}
            >
              <span
                className={styles.colorDot}
                style={{ backgroundColor: option.color }}
              ></span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
