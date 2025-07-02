/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { addLocale, locale } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';
import Label from '@components/texts/Label';
import TextButton from '@components/buttons/TextButton';
import TextError from '@components/texts/TextError';
import './style.module.css';
import style from './style.module.css';

const OrdemServicoSchema = z.object({
  descricao: z.string().min(1, 'Descrição obrigatória'),
  dataInicio: z.date({ required_error: 'Data de início obrigatória' }),
  dataFim: z.date({ required_error: 'Data de fim obrigatória' }),
  status: z.enum([
    'Em_Andamento',
    'Pendente',
    'Pausado',
    'Fechado',
    'Cancelado',
  ]),
  cliente: z.string().min(1, 'Cliente obrigatório'),
  veiculo: z.string().min(1, 'Veículo obrigatório'),
  tiposServico: z
    .array(z.number())
    .min(1, 'Selecione ao menos um tipo de serviço'),
  feedback: z.string().optional(),
});

type OrdemServicoFormData = z.infer<typeof OrdemServicoSchema>;

interface Cliente {
  id_usuario: number;
  nome: string;
}

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
}

interface TipoServico {
  id: number;
  nome: string;
}

export default function ServiceOrders() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<number | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OrdemServicoFormData>({
    resolver: zodResolver(OrdemServicoSchema),
    defaultValues: {
      tiposServico: [],
    },
  });

  useEffect(() => {
    api
      .get('/api/usuarios/busca_tipo', { params: { tipo: 'usuario' } })
      .then((res) => {
        const ativos = res.data.filter((tipo: any) => tipo.deletado === false);
        setClientes(ativos);
      })
      .catch(() => toast.error('Erro ao carregar lista de clientes.'));
  }, []);

  const clienteId = watch('cliente');
  const veiculoSelecionado = watch('veiculo');
  const statusValue = watch('status');
  const [tiposServico, setTiposServico] = useState<TipoServico[]>([]);
  const [tiposSelecionados, setTiposSelecionados] = useState<number[]>([]);

  useEffect(() => {
    if (clienteId) {
      const id = Number(clienteId);
      setClienteSelecionado(id);
      setValue('veiculo', ''); 
      api
        .get(`/api/veiculos/busca_cliente/${id}`)
        .then((res) => {
          const ativos = res.data.filter(
            (tipo: any) => tipo.deletado === false,
          );
          setVeiculos(ativos);
        })
        .catch(() => toast.error('Erro ao carregar veículos do cliente.'));
    } else {
      setVeiculos([]);
      setValue('veiculo', ''); 
    }
  }, [clienteId]);

  useEffect(() => {
    addLocale('pt', {
      firstDayOfWeek: 0,
      dayNames: [
        'domingo',
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado',
      ],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: [
        'Janeiro-',
        'Fevereiro-',
        'Março-',
        'Abril-',
        'Maio-',
        'Junho-',
        'Julho-',
        'Agosto-',
        'Setembro-',
        'Outubro-',
        'Novembro-',
        'Dezembro-',
      ],
      monthNamesShort: [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
      ],
      today: 'Hoje',
      clear: 'Limpar',
      chooseDate: 'Escolher data',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sm',
      weak: 'Fraco',
      medium: 'Médio',
      strong: 'Forte',
      passwordPrompt: 'Digite uma senha',
      emptyMessage: 'Nenhum resultado encontrado',
      emptyFilterMessage: 'Nenhum resultado encontrado',
    });
    locale('pt');
  }, []);

  useEffect(() => {
    api
      .get('/api/tiposervico/todos')
      .then((res) => {
        const ativos = res.data.filter((tipo: any) => tipo.deletado === false);
        setTiposServico(ativos);
      })
      .catch(() => toast.error('Erro ao carregar tipos de serviço.'));
  }, []);

  const onSubmit: SubmitHandler<OrdemServicoFormData> = async (data) => {
    try {
      const payload = {
        ...data,
        dataInicio: data.dataInicio.toISOString(),
        dataFim: data.dataFim.toISOString(),
        cliente: Number(data.cliente),
        veiculo: Number(data.veiculo),
        detalhes: 'nenhum',
        feedback: 'nenhum',
        tiposServico: tiposSelecionados.map((id) => ({ id })),
      };

      await api.post('/api/ordemServico/cadastro_completo', payload);
      toast.success('Ordem de serviço cadastrada com sucesso!');
      reset();
      setTiposSelecionados([]);
      setClienteSelecionado(null);
      setVeiculos([]);
    } catch {
      toast.error('Erro ao cadastrar ordem de serviço.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
      <div style={{ marginBottom: '1rem' }}>
        <Label text='Descrição' />
        <InputTextarea
          {...register('descricao')}
          rows={3}
          className={style.input}
        />
        {errors.descricao && (
          <TextError text={errors.descricao.message ?? ''} />
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Label text='Data de Início' />
        <Calendar
          value={watch('dataInicio')}
          onChange={(e) => setValue('dataInicio', e.value!)}
          dateFormat='dd/mm/yy'
          showIcon
          locale='pt'
          className={style.input}
          panelClassName='custom-calendar-panel'
        />
        {errors.dataInicio && (
          <TextError text={errors.dataInicio.message ?? ''} />
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Label text='Data de Fim' />
        <Calendar
          value={watch('dataFim')}
          onChange={(e) => setValue('dataFim', e.value!)}
          dateFormat='dd/mm/yy'
          showIcon
          locale='pt'
          className={style.input}
        />
        {errors.dataFim && <TextError text={errors.dataFim.message ?? ''} />}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Label text='Status' />
        <Dropdown
          value={statusValue}
          options={[
            { label: 'Em Andamento', value: 'Em_Andamento' },
            { label: 'Pendente', value: 'Pendente' },
            { label: 'Pausado', value: 'Pausado' },
            { label: 'Fechado', value: 'Fechado' },
            { label: 'Cancelado', value: 'Cancelado' },
          ]}
          onChange={(e) => setValue('status', e.value)}
          placeholder='Selecione o status'
          className={`${style.input} custom-dropdown`}
        />
        {errors.status && <TextError text={errors.status.message ?? ''} />}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Label text='Cliente' />
        <Dropdown
          value={clienteId}
          options={clientes.map((c) => ({
            label: c.nome,
            value: String(c.id_usuario),
          }))}
          onChange={(e) => setValue('cliente', e.value)}
          placeholder='Selecione um cliente'
          className={style.input}
          filter
          filterPlaceholder='Buscar cliente...'
        />
        {errors.cliente && <TextError text={errors.cliente.message ?? ''} />}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Label text='Veículo' />
        <Dropdown
          value={veiculoSelecionado}
          options={veiculos.map((v) => ({
            label: `${v.marca} - ${v.modelo} - ${v.ano} - ${v.placa}`,
            value: String(v.id),
          }))}
          onChange={(e) => setValue('veiculo', e.value)}
          placeholder='Selecione um veículo'
          disabled={!clienteSelecionado}
          className={style.input}
          filter
          filterPlaceholder='Buscar veículo...'
        />
        {errors.veiculo && <TextError text={errors.veiculo.message ?? ''} />}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Label text='Tipos de Serviço' />
        <MultiSelect
          value={tiposSelecionados}
          options={tiposServico.map((t) => ({
            label: t.nome,
            value: t.id,
          }))}
          onChange={(e) => {
            setTiposSelecionados(e.value);
            setValue('tiposServico', e.value); // adiciona ao react-hook-form
          }}
          placeholder='Selecione os tipos de serviço'
          className={style.input}
          filter
          display='chip'
        />
        {errors.tiposServico && (
          <TextError text={errors.tiposServico.message ?? ''} />
        )}
      </div>

      {/* <div style={{ marginBottom: '1rem' }}>
        <Label text='Feedback' />
        <InputTextarea
          {...register('feedback')}
          rows={3}
          className={style.input}
        />
      </div> */}

      <div className={style.buttonsContainer}>
        <TextButton text='Cadastrar Ordem de Serviço' type='submit' />
      </div>
    </form>
  );
}
