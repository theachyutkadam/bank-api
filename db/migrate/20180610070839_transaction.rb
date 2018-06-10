class Transaction < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :particular
      t.integer :user_id
      t.decimal :debit
      t.decimal :credit
      t.decimal :closing_balance
    end

    add_index :transactions, :user_id
  end
end
